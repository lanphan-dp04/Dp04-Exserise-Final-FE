import "./styleError.css";

import React, { useState } from 'react'
import Loanding from "../../components/loading/Loanding";

export default function Page404() {
    const [loading, setLoading] = useState(true);
    setTimeout(() => {
        setLoading(false);
      }, 500);
    return (
        <div>
      {loading ? <Loanding   /> :
        <div>
            <div class="flex-container">
                <div class="text-center">
                    <h1>
                        <span class="fade-in text-size-err" id="digit1">4</span>
                        <span class="fade-in text-size-err" id="digit2">0</span>
                        <span class="fade-in text-size-err" id="digit3">4</span>
                    </h1>
                    <h3 class="fadeIn">PAGE NOT FOUND</h3>
                </div>
            </div>
        </div>}
    </div>
    )
}
