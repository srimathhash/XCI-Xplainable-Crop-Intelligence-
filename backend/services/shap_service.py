import numpy as np
import shap
from services.ml_service import MODEL, FEATURE_ORDER

# ─────────────────────────────────────────────
# TreeExplainer – computed once, reused per request
# ─────────────────────────────────────────────
print("[AgriSen] Initialising SHAP TreeExplainer...")
EXPLAINER = shap.TreeExplainer(MODEL)
print("[AgriSen] SHAP TreeExplainer ready")

# Human-readable labels
FEATURE_LABELS = {
    "N": "Nitrogen",
    "P": "Phosphorus",
    "K": "Potassium",
    "temperature": "Temperature",
    "humidity": "Humidity",
    "ph": "pH",
    "rainfall": "Rainfall",
}


def _impact_label(value: float) -> str:
    abs_v = abs(value)
    sign = "positive" if value > 0 else "negative"
    if abs_v >= 0.3:
        return f"strong {sign}"
    elif abs_v >= 0.1:
        return sign
    else:
        return f"moderate {sign}"


def explain(features: dict, pred_class_idx: int, crop: str, top_crops: list) -> tuple:
    """
    Returns:
        top_factors: list of {"feature": str, "impact": str}
        explanation_text: str
        shap_values_for_class: list of {"feature": str, "value": float} (for chart)
    """
    X = np.array([[features[f] for f in FEATURE_ORDER]])

    # shap_values shape: (n_classes, n_samples, n_features) for RF
    shap_vals = EXPLAINER.shap_values(X)

    # For multi-class RF, shap_values is a list of arrays or a 3D array
    if isinstance(shap_vals, list):
        class_shap = shap_vals[pred_class_idx][0]  # shape (n_features,)
    else:
        # newer shap versions return (n_samples, n_features, n_classes)
        if len(shap_vals.shape) == 3:
            class_shap = shap_vals[0, :, pred_class_idx]
        elif len(shap_vals.shape) == 2:
            class_shap = shap_vals[0]
        else:
            class_shap = shap_vals

    # Pair features with shap values
    pairs = list(zip(FEATURE_ORDER, class_shap))
    # Sort by absolute value descending
    pairs_sorted = sorted(pairs, key=lambda x: abs(x[1]), reverse=True)
    top3 = pairs_sorted[:3]

    top_factors = [
        {"feature": FEATURE_LABELS.get(f, f), "impact": _impact_label(v)}
        for f, v in top3
    ]

    # Build readable explanation using SHAP contributors
    positive_features = [FEATURE_LABELS.get(f, f) for f, v in pairs_sorted if v > 0]
    
    # Capitalize the crop name for the sentence
    crop_cap = crop.capitalize()
    
    if len(positive_features) >= 2:
        primary_factors = f"{positive_features[0]} and {positive_features[1].lower()}"
        secondary = positive_features[2:]
        if secondary:
            secondary_factors = f", while {', '.join(f.lower() for f in secondary)} also contribute positively."
        else:
            secondary_factors = " levels."
        
        sentence1 = f"{crop_cap} is recommended because the current soil and climate conditions closely match its optimal growth requirements."
        sentence2 = f"{primary_factors} strongly support {crop_cap.lower()} cultivation{secondary_factors}"
    else:
        sentence1 = f"{crop_cap} is recommended based on the provided soil and climate parameters."
        sentence2 = ""

    # Add context about the alternative crops
    alternatives = [item["crop"].capitalize() for item in top_crops if item["crop"] != crop]
    if len(alternatives) >= 2:
        sentence3 = f"Other crops such as {alternatives[0].lower()} and {alternatives[1].lower()} were evaluated, but their optimal temperature and rainfall requirements are less compatible with the current environment."
    elif len(alternatives) == 1:
        sentence3 = f"Another crop such as {alternatives[0].lower()} was evaluated, but its optimal requirements are less compatible with the current environment."
    else:
        sentence3 = ""
        
    explanation_text = f"{sentence1}\n\n{sentence2}\n\n{sentence3}".strip()

    # Full SHAP values for bar chart (researcher view)
    shap_chart = [
        {"feature": FEATURE_LABELS.get(f, f), "value": float(round(v, 4))}
        for f, v in pairs_sorted
    ]

    return top_factors, explanation_text, shap_chart
