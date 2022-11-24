import editIcon from "../../assets/images/edit.svg";
import deleteIcon from "../../assets/images/delete.svg";

const Transaction = () => {
	return (
		<li className='transaction income'>
			<p>Earned this month</p>
			<div className='right'>
				<p>৳ 100</p>
				<button className='link'>
					<img alt='edit icon' className='icon' src={editIcon} />
				</button>
				<button className='link'>
					<img alt='delete icon' className='icon' src={deleteIcon} />
				</button>
			</div>
		</li>
	);
};

export default Transaction;
