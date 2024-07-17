import { Payment } from '../models/Payment';
import { generateGrid, generateCode } from './gridService';

export async function addPayment(userId: string, name: string, amount: number) {
  try {
    const grid = generateGrid();
    const code = generateCode(grid);

    const payment = new Payment({
      userId,
      name,
      amount,
      code,
      grid,
    });

    await payment.save();

    return {
      id: payment._id,
      userId: payment.userId,
      name: payment.name,
      amount: payment.amount,
      code: payment.code,
      grid: payment.grid,
      createdAt: payment.createdAt,
    };
  } catch (error) {
    console.error('Error adding payment:', error);
    throw new Error('Failed to add payment');
  }
}

export async function getPayments(userId) {
  try {
    const payments = await Payment.find({ userId }).sort({ createdAt: -1 });
    
    return payments.map((payment) => ({
      id: payment._id,
      name: payment.name,
      amount: payment.amount,
      code: payment.code,
      grid: payment.grid,
      createdAt: payment.createdAt,
    }));
    
  } catch (error) {
    console.error('Error fetching payments:', error);
    throw new Error('Failed to fetch payments');
  }
}
