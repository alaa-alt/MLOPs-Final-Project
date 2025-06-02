async function getPredictedLabel(processed_t) {
  // Flatten the 21 [x, y, z] triplets into one flat array of 63 numbers
  const landmarks = processed_t.flatMap(lm => [lm.x, lm.y, lm.z]);

  console.log("Sending landmarks:", landmarks);

  const payload = {
    landmarks: landmarks
  };

  try {
    const response = await fetch("http://127.0.0.1:8000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    console.log("API response:", data);

    const labelMap = {
      like: "up",
      dislike: "down",
      peace: "right",
      peace_inverted: "left"
    };

    console.log(data.predicted_label);
    return labelMap[data.predicted_label] || null;

  } catch (error) {
    console.error("Error calling prediction API:", error);
    return null;
  }
}
