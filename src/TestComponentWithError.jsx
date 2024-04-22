// TestComponentWithError.jsx
import React from "react";

function TestComponentWithError() {
    throw new Error("Intentional error for testing");
}

export default TestComponentWithError;
