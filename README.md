**📀PROJECT OVEREVIEW:**

This is a _AI-CUSTOMER-SUPPORT-AGENT_ for validating e-commerce refund requests built with react, next.js and TyepScript. This specific application is a tool based workflow that dynamically verifies the following. 
   * Customer Orders
   * Refund Eligibility
   * Refund Reasons
   * Order Status
   * Validates Refund Window
This Applicaton also has an Admin DashBoard which provides Real-Time logs about the request and response details for transparency.
---

**🧩FEATURES OF THE APPLICATION**

**_Customer Interface_**
* Chat-Based refund and request System
* Voice based input interface
* Order ID extraction from input
* Refund approval or Denial
  
**_WorkFlow of the Agent_**
* Order ID detection
* Verification of Customer
* Refund window Validation
* Category Validation
* Order Status Validation
* Refund Reason Validation
* Final Decision

**_Admin Dashboard_**
* Reasoning logs
* Refund Approval or Denial
* Refund Approval Rate
* Logs Deletion
---

**🚀INSTALLATION**

_Clone Repository_

git clone https://github.com/pragsn/Customer-Agent.git

cd Customer-Agent

_Install Dependencies_

npm install

_Run Developement Server_

npm run dev

_Production Build_

npm run build
npm start / npm run dev

_Testing_

npm run test

---

**🤖TECH STACK JUSTIFICATION**

_👾**Frontend**_

This Application uses React for frontend using UI pieces for components of application. The React frontend helps better integration with the next.js Backend. The Creation of Application is done with _"npx create-next-app@latest"_. The interface has Text and Speech recognition for entring the input request. The Admin Dashbaord is also included where we can check the approval and denial of the order requests and deletion of either individual logs or entire logs along with approval rate.

_👾**Database**_

I have given 15 mock data that simulates a CRM Database and the data includes both structural representations of customer details and order details. The validations of the refund policy can be verified using the order details once the customer ID is verified. 

_👾**Backend**_

The backend is implemented using Next.js API Routes, which handle refund processing, agent orchestration, and reasoning log management.

_👾**Testing**_

Vitest was used to implement automated unit tests for refund validation logic and agent workflows. A total of 18 test cases were executed successfully.

---

**🤖TOOL BASED WORKFLOW?**

The agent dynamically calls tools to validate refund eligibility.

_Tool 1: Order Lookup_

Verifies that the order exists.

_Tool 2: Customer Verification_

Verifies that the customer profile exists.

_Tool 3: Category Validation_

Checks whether the product category is refundable.

_Tool 4: Status Validation_

Validates order status.

_Tool 5: Refund Window Validation_

Checks whether the request is within the allowed refund period.

_Tool 6: Refund Reason Validation_

Validates the refund reason against policy rules.

_Final Decision_

Approve or deny refund request.

  

  
