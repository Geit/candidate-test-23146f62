import {
    render,
    within,
    screen,
    fireEvent,
    waitForElementToBeRemoved,
    waitFor,
} from "@testing-library/react";
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
        name: "Samwise Gamgee",
        category: "hobbit",
        description: "Frodo's gardener.",
        significanceIndex: 1,
        avatar: "samwise_gamgee.jpg",
    },
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
        significanceIndex: 2,
        avatar: "gandalf_the_grey.jpg",
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
        let matchingItemCountInMock = 0;
        let itemsToBeRemoved = [];
        let itemsRemaining = [];

        beforeEach(async () => {
            createFetchSuccessMock(multipleCharacterMock);

            render(<CharacterListing />);

            const categorySelect = await screen.findByLabelText("Category");

            fireEvent.change(categorySelect, {
                target: { value: multipleCharacterMock[0].category },
            });

            itemsRemaining = multipleCharacterMock.filter(
                (char) => char.category == multipleCharacterMock[0].category
            );
            itemsToBeRemoved = multipleCharacterMock.filter(
                (char) => char.category != multipleCharacterMock[0].category
            );
            matchingItemCountInMock = multipleCharacterMock.length - itemsToBeRemoved.length;

            // We need to wait for the newly filtered items to actually be removed
            // as changing the filter causes the request to be remade.
            await waitForElementToBeRemoved(() => screen.queryByText(itemsToBeRemoved[0].name));
        });

        it("should show entries from that category", () => {
            const items = screen.getAllByTestId("CharacterProfile");

            expect(items).toHaveLength(matchingItemCountInMock);

            for (let i = 0; i < itemsRemaining.length; i++) {
                expect(screen.getByText(itemsRemaining[i].name)).toBeInTheDocument();
            }
        });

        it("should not show entries from any other category", () => {
            expect.assertions(itemsToBeRemoved.length);

            for (let i = 0; i < itemsToBeRemoved.length; i++) {
                expect(screen.queryByText(itemsToBeRemoved[i].name)).not.toBeInTheDocument();
            }
        });
    });

    describe("When ordering by alphabetical", () => {
        it("should show the characters in the appropriate order", async () => {
            createFetchSuccessMock(multipleCharacterMock);

            const { findAllByTestId } = render(<CharacterListing />);

            await screen.findAllByTestId("CharacterProfile");

            const orderingSelect = await screen.findByLabelText("Order by");

            fireEvent.change(orderingSelect, { target: { value: "alphabetical" } });

            // We need to wait for the results to become alphabetical
            await waitFor(async () => {
                const items = await findAllByTestId("CharacterProfile");

                // This test won't work with 1 item.
                expect(items.length).toBeGreaterThan(1);

                for (let i = 0; i < items.length - 1; i++) {
                    const elementA = items[i].querySelector("h2");
                    const elementB = items[i + 1].querySelector("h2");
                    expect(elementA).toBeInTheDocument();
                    expect(elementB).toBeInTheDocument();
                    expect(elementA.innerHTML.localeCompare(elementB.innerHTML)).toBeLessThan(0);
                }
            });

            const items = await findAllByTestId("CharacterProfile");
            const itemText = items.map((item) => item.querySelector("h2").innerHTML);
            expect(itemText).toMatchInlineSnapshot(`
                Array [
                  "Frodo Baggins",
                  "Gandalf the Grey",
                  "Samwise Gamgee",
                ]
            `);
        });
    });

    describe("When ordering by significance", () => {
        it("should show the characters in the appropriate order", async () => {
            createFetchSuccessMock(multipleCharacterMock);

            const { findAllByTestId } = render(<CharacterListing />);

            await screen.findAllByTestId("CharacterProfile");

            const orderingSelect = await screen.findByLabelText("Order by");

            fireEvent.change(orderingSelect, { target: { value: "significance" } });

            // We need to wait for the results to become non-alphabetical
            await waitFor(async () => {
                const items = await findAllByTestId("CharacterProfile");

                // This test won't work with 1 item.
                expect(items.length).toBeGreaterThan(1);

                let outOfAlphabeticalOrder = false;

                for (let i = 0; i < items.length - 1; i++) {
                    const elementA = items[i].querySelector("h2");
                    const elementB = items[i + 1].querySelector("h2");
                    expect(elementA).toBeInTheDocument();
                    expect(elementB).toBeInTheDocument();

                    if (elementA.innerHTML.localeCompare(elementB.innerHTML) > 0)
                        outOfAlphabeticalOrder = true;
                }

                expect(outOfAlphabeticalOrder).toBeTruthy();
            });

            const items = await findAllByTestId("CharacterProfile");
            const itemText = items.map((item) => item.querySelector("h2").innerHTML);
            expect(itemText).toMatchInlineSnapshot(`
                Array [
                  "Frodo Baggins",
                  "Samwise Gamgee",
                  "Gandalf the Grey",
                ]
            `);
        });
    });
});
