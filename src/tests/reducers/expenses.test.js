import expensesReducer from "../../reducers/expenses";
import expenses from "../fixtures/expenses";
test("should set default state", () => {
  const state = expensesReducer(undefined, { type: "@INIT" });

  expect(state).toEqual([]);
});

test("should remove expense by id", () => {
  const action = {
    type: "REMOVE_EXPENSE",
    id: expenses[1].id,
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[0], expenses[2]]);
});

test("should not remove expense if id not found", () => {
  const action = {
    type: "REMOVE_EXPENSE",
    id: "-1",
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test("should add expense", () => {
  const action = {
    type: "ADD_EXPENSE",
    expense: {
      id: "6",
      amount: 194,
    },
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([...expenses, action.expense]);
});

test("should edit an expense", () => {
  const action = {
    type: "EDIT_EXPENSE",
    id: "1",
    updates: { description: "Edit Gum" },
  };

  const state = expensesReducer(expenses, action);
  expect(state[0].description).toEqual("Edit Gum");
});


test("should not edit an expense if expense not found", () => {
    const action = {
      type: "EDIT_EXPENSE",
      id: "99",
      updates: { description: "Edit Gum" },
    };
  
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
  });
