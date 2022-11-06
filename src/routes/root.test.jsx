import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Root from "./root";

describe("App Component", () => {
	it("renders learn react link", () => {
		const { getByText } = render(<Root />);

		expect(getByText(/React Router Contacts/i)).toBeInTheDocument();
	});
});
