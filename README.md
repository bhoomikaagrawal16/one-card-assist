# Agentic AI for Fintech Collections

> An end-to-end, multilingual chatbot system built to automate the debt collection lifecycle on WhatsApp and Web. This project leverages a sophisticated agentic architecture to create a scalable, compliant, and empathetic collections process for the fintech industry.

---

## About The Project

Traditional debt collection is a manual, resource-intensive process that often struggles with scalability and can lead to negative customer experiences. This project solves that problem by creating an intelligent virtual assistant, "PredixionAI," designed to handle thousands of concurrent conversations, 24/7, across multiple languages and platforms.

The system is built as a series of interconnected workflows in n8n, functioning as an autonomous agent. It can reason based on user input, use external tools to fetch and update data, and take actions to guide a user from initial contact through to final payment verification. The core focus is on enhancing efficiency and compliance while providing a respectful and supportive experience for the customer.

---

## Key Features & Functionality

#### 🤖 Dynamic & Empathetic AI Persona
The heart of the system is an AI agent with a carefully engineered persona.
-   **Dynamic Tone Adjustment:** The AI's tone and messaging change in real-time based on the customer's account status, such as the number of days a payment is overdue.
-   **Empathetic Responses:** The agent is explicitly programmed to handle sensitive situations like job loss or medical emergencies with empathy, offering support instead of demanding payment.
-   **Contextual Conversations:** Utilizes conversation memory to ensure a coherent, multi-turn dialogue with users.

#### 🌐 Multilingual & Multi-Channel Support
Designed to be accessible to a diverse user base.
-   **Seamless Communication:** Engages users on both **WhatsApp** and a **Web** interface.
-   **Broad Language Capability:** A custom-built language detection module enables fluent conversation in **English, Hindi, Marathi, Tamil, Telugu, and Hinglish** (Romanized Hindi).

#### ⚙️ Advanced Intent Detection Engine
A robust pre-processing layer built with custom JavaScript identifies critical user intents before they are passed to the AI.
-   **Promise-to-Pay (PTP) Recognition:** Detects when a user commits to a future payment, automatically extracting the specific date and amount from the message. This logic uses extensive keyword lists, regular expressions, and fuzzy string matching (Levenshtein distance) to handle typos and linguistic variations.
-   **Compliance & Risk Flags:** Automatically identifies and flags conversations for human review based on keywords related to:
    -   **DND (Do Not Disturb):** When a user requests to stop contact.
    -   **Escalation:** When a user mentions legal action, fraud, or harassment.
    -   **Account Closed:** When a user claims their account is already settled.

#### 🛠️ Tool-Using Agentic Architecture
The AI agent is empowered with a suite of tools to perform real-world actions.
-   **Real-time Database Interaction:** Connects to a **Supabase** database to fetch personalized customer data (due amount, pending days, etc.) and update records with conversation outcomes (e.g., PTP logged, DND status updated).
-   **Secure Payment Verification:** Integrates with the **Razorpay API** to securely verify payment statuses in real-time, completing the collections lifecycle.
-   **Human Handoff:** Sends instant alerts to a human support team via **Slack** when an escalation or critical event is detected, ensuring a seamless and compliant handoff.

---

## Workflow Breakdown

The system is composed of three core, interconnected workflows:

1.  **Main Chat Workflow (`full_and_final_workflow_web.json` & `full_and_final_workflow.json`):** This is the brain of the operation. It receives incoming messages, runs the language and intent detection engines, orchestrates the AI's responses, and uses the Supabase tool to manage user data.
2.  **Payment Verification Workflow (`payment_workflow_web.json`):** A dedicated and secure micro-service that is triggered after a user attempts payment. It uses the Razorpay API to confirm the transaction status and updates the user's account in Supabase accordingly.
3.  **Card Display Workflow (`card_display_final.json`):** A simple backend service that fetches a user's latest account details from Supabase and serves it to the web interface, ensuring the user always sees up-to-date information.

---

## Tech Stack

-   **Orchestration:** n8n
-   **AI / LLM:** Azure OpenAI (GPT-4o)
-   **Database:** Supabase
-   **Payments:** Razorpay API
-   **Alerting:** Slack API
-   **Core Logic:** JavaScript (Node.js)
