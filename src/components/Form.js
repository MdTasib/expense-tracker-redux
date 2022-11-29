import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTransactions } from "../features/transaction/transactionSlice";

const Form = () => {
	const [name, setName] = useState("");
	const [type, setType] = useState("");
	const [amount, setAmout] = useState("");
	const dispatch = useDispatch();
	const { isLoading, isError } = useSelector(state => state.transaction);

	const handleCreate = e => {
		e.preventDefault();
		dispatch(
			createTransactions({
				name,
				type,
				amount: Number(amount),
			})
		);
	};

	return (
		<div className='form'>
			<h3>Add new transaction</h3>

			<form onSubmit={handleCreate}>
				<div className='form-group'>
					<label>Name</label>
					<input
						type='text'
						name='transaction_name'
						placeholder='enter title'
						value={name}
						onChange={e => setName(e.target.value)}
						required
					/>
				</div>

				<div className='form-group radio'>
					<label>Type</label>
					<div className='radio_group'>
						<input
							type='radio'
							value='income'
							name='transaction_type'
							checked={type === "income"}
							onChange={() => setType("income")}
							required
						/>
						<label>Income</label>
					</div>
					<div className='radio_group'>
						<input
							type='radio'
							value='expense'
							name='transaction_type'
							placeholder='Expense'
							checked={type === "expense"}
							onChange={() => setType("expense")}
						/>
						<label>Expense</label>
					</div>
				</div>

				<div className='form-group'>
					<label>Amount</label>
					<input
						type='number'
						placeholder='enter amount'
						name='transaction_amount'
						value={amount}
						onChange={e => setAmout(e.target.value)}
						required
					/>
				</div>

				<button disabled={isLoading} className='btn' type='submit'>
					Add Transaction
				</button>

				{!isLoading && isError && (
					<p className='error'>There was an error occured</p>
				)}
			</form>

			<button className='btn cancel_edit'>Cancel Edit</button>
		</div>
	);
};

export default Form;
