import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
	getTransactions,
	addTransaction,
	editTransaction,
	deleteTransaction,
} from "./transactionApi";

// initial state
const initialState = {
	transactions: [],
	isLoading: false,
	isError: false,
	error: "",
};

// create async thunks
export const fetchTransactions = createAsyncThunk(
	"transaction/fetchTransactions",
	async () => {
		const transactions = await getTransactions();
		return transactions;
	}
);

export const createTransaction = createAsyncThunk(
	"transaction/createTransaction",
	async data => {
		const transaction = await addTransaction(data);
		return transaction;
	}
);

export const changeTransaction = createTransaction(
	"transaction/changeTransaction",
	async ({ id, data }) => {
		const transaction = await editTransaction(id, data);
		return transaction;
	}
);

export const removeTransaction = createAsyncThunk(
	"transaction/removeTransaction",
	async id => {
		const transaction = await deleteTransaction(id);
		return transaction;
	}
);

// create slice
const transactionSlice = createSlice({
	name: "transaction",
	initialState,
	extraReducers: builder => {
		builder
			// get transactions
			.addCase(fetchTransactions.pending, state => {
				state.isLoading = true;
				state.isError = false;
			})
			.addCase(fetchTransactions.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.transactions = action.payload;
			})
			.addCase(fetchTransactions.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.transactions = [];
				state.error = action.error?.message;
			})

			// add transaction
			.addCase(createTransaction.pending, state => {
				state.isLoading = true;
				state.isError = false;
			})
			.addCase(createTransaction.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.transactions.push(action.payload);
			})
			.addCase(createTransaction.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.error = action.error?.message;
			})

			// edit transaction
			.addCase(changeTransaction.pending, state => {
				state.isLoading = true;
				state.isError = false;
			})
			.addCase(changeTransaction.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;

				const indexToUpdate = state.transactions.findIndex(
					t => t.id === action.payload.id
				);
				state.transactions[indexToUpdate] = action.payload;
			})
			.addCase(changeTransaction.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.error = action.error?.message;
			})

			// remove transaction
			.addCase(removeTransaction.pending, state => {
				state.isLoading = true;
				state.isError = false;
			})
			.addCase(removeTransaction.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.transactions = state.transactions.filter(
					t => t.id !== action.payload.id
				);
			})
			.addCase(removeTransaction.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.error = action.error?.message;
			});
	},
});

export default transactionSlice.reducer;
