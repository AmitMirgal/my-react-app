import React from "react";
import ReactDOM from "react-dom/client";
import Root, {
	loader as rootLoader,
	action as rootAction,
} from "./routes/root";
import {
	loader as contactLoader,
	action as contactAction,
} from "./routes/contact";
import { action as editAction } from "./routes/edit";
import { action as destroyAction } from "./routes/destroy";
import Index from "./routes/index";

import "./index.css";
import reportWebVitals from "./reportWebVitals";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const LazyErrorPage = React.lazy(() => import("./error-page"));
const LazyEditContact = React.lazy(() => import("./routes/edit"));
const LazyContact = React.lazy(() => import("./routes/contact"));

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		errorElement: (
			<React.Suspense fallback={<>fallback component</>}>
				<LazyErrorPage />
			</React.Suspense>
		),
		loader: rootLoader,
		action: rootAction,
		children: [
			{
				errorElement: (
					<React.Suspense fallback={<>fallback component</>}>
						<LazyErrorPage />
					</React.Suspense>
				),
				children: [
					{ index: true, element: <Index /> },
					{
						path: "contacts/:contactId",
						element: (
							<React.Suspense fallback={<>fallback component</>}>
								<LazyContact />
							</React.Suspense>
						),
						loader: contactLoader,
						action: contactAction,
					},
					{
						path: "contacts/:contactId/edit",
						element: (
							<React.Suspense fallback={<>fallback component</>}>
								<LazyEditContact />
							</React.Suspense>
						),
						loader: contactLoader,
						action: editAction,
					},
					{
						path: "contacts/:contactId/destroy",
						action: destroyAction,
						errorElement: <div>Oops! There was an error.</div>,
					},
				],
			},
		],
	},
]);

// here is the doc for code-splitting technique with react router
// https://dev.to/infoxicator/data-routers-code-splitting-23no
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
