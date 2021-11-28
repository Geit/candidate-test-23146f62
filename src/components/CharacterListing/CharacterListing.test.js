import { render, within } from "@testing-library/react";
import { CharacterListing } from "./index";

const createFetchSuccessMock = (data) => {
    jest.spyOn(global, "fetch").mockResolvedValue({
        json: jest.fn().mockResolvedValue(data),
    });
};

const singleCharacterMock = [
    {
        name: "Frodo Baggins",
        category: "hobbit",
        description: "A test description.",
        significanceIndex: 0,
        avatar: "frodo_baggins.jpg",
    },
];

const multipleCharacterMock = [
    {
        name: "Frodo Baggins",
        category: "hobbit",
        description: "The main character.",
        significanceIndex: 0,
        avatar: "frodo_baggins.jpg",
    },
    {
        name: "Gandalf the Grey",
        category: "wizard",
        description: "A wizarding wizard.",
        significanceIndex: 1,
        avatar: "gandalf_the_grey.jpg",
    },
    {
        name: "Samwise Gamgee",
        category: "hobbit",
        description: "Frodo's gardener.",
        significanceIndex: 2,
        avatar: "samwise_gamgee.jpg",
    },
];

describe("CharacterListing", () => {
    describe("When landing on the page", () => {
        it("should render a loading state before the data fetch is complete", async () => {
            createFetchSuccessMock(singleCharacterMock);

            const { getByText, findAllByTestId } = render(<CharacterListing />);

            // Note: This works because getByText doesn't allow the promise within the mock to
            // resolve before we look at the render output. Using findBy* will cause the promise
            // to be resolved, and we will be in a "rendered with data" state.
            expect(getByText("Loading")).toBeInTheDocument();

            // However, we do have to allow the Test Renderer to finish all async actions to avoid a warning.
            const items = await findAllByTestId("CharacterProfile");
            expect(items).toHaveLength(1);
        });

        it("should render a single character when that is all that is provided", async () => {
            createFetchSuccessMock(singleCharacterMock);

            const { findAllByTestId } = render(<CharacterListing />);

            const items = await findAllByTestId("CharacterProfile");

            expect(items).toHaveLength(1);
            expect(items[0]).toHaveTextContent("Frodo Baggins");
            expect(items[0]).toHaveTextContent("hobbit");
            expect(items[0]).toHaveTextContent("A test description.");

            const portrait = within(items[0]).getByAltText("A portrait of Frodo Baggins");
            expect(portrait).toBeInTheDocument();
        });

        it("should render multiple characters when provided", async () => {
            createFetchSuccessMock(multipleCharacterMock);

            const { findAllByTestId, getByText } = render(<CharacterListing />);

            const items = await findAllByTestId("CharacterProfile");

            expect(items).toHaveLength(multipleCharacterMock.length);

            expect(getByText("Frodo Baggins")).toBeInTheDocument();
            expect(getByText("Gandalf the Grey")).toBeInTheDocument();
            expect(getByText("Samwise Gamgee")).toBeInTheDocument();
        });

        it("should render an appropriate message if no characters are found", async () => {
            createFetchSuccessMock([]);

            const { findByText } = render(<CharacterListing />);

            expect(await findByText("No Characters found!")).toBeInTheDocument();
        });

        it("should render an error if the request fails", async () => {
            jest.spyOn(global, "fetch").mockResolvedValue({
                json: jest.fn().mockRejectedValue("Request failed"),
            });

            const { findByText } = render(<CharacterListing />);

            expect(await findByText("Unable to retrieve character listing.")).toBeInTheDocument();
        });
    });

    describe("When filtering to a specific category", () => {
        it.todo("should show entries from that category");
        it.todo("should not show entries from any other category");
    });

    describe("When ordering by alphabetical", () => {
        it.todo("should show the characters in the appropriate order");
    });

    describe("When ordering by significance", () => {
        it.todo("should show the characters in the appropriate order");
    });
});
