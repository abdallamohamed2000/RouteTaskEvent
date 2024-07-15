import { Component, OnInit } from '@angular/core';
import { allCustomer } from 'src/app/models/ICustomer';
import { allTransaction } from 'src/app/models/ITransaction';
import { CustomerService } from 'src/app/services/customer.service';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  customers: allCustomer = [];
  transactions: allTransaction = [];

  filteredCustomers: allCustomer = [];
  selectedCustomerTransactions: allTransaction = [];

  customerSearchInput: string = '';

  customerTransactionAmounts: { [key: string]: number } = {};

  constructor(
    private customerService: CustomerService,
    private transactionService: TransactionService
  ) { }

  ngOnInit(): void {
    this.customerService.getCustomers().subscribe(data => {
      this.customers = data;
      this.filteredCustomers = this.customers;
      this.calculateTransactionAmounts();
    });

    this.transactionService.getTransactions().subscribe(data => {
      this.transactions = data;
      this.calculateTransactionAmounts();
    });
  }

  calculateTransactionAmounts(): void {
    this.customerTransactionAmounts = this.customers.reduce((acc, customer) => {
      const totalAmount = this.transactions
        .filter(transaction => transaction.customer_id === +customer.id)
        .reduce((sum, transaction) => sum + transaction.amount, 0);
      acc[customer.id] = totalAmount;
      return acc;
    }, {} as { [key: string]: number });
  }

  filterCustomers(): void {
    const searchTerm = this.customerSearchInput.toLowerCase().trim();

    if (!searchTerm) {
      this.filteredCustomers = this.customers;
      return;
    }

    this.filteredCustomers = this.customers.filter(customer => {
      // Check if customer name matches search term
      const nameMatches = customer.name.toLowerCase().includes(searchTerm);

      // Check if any transaction amount matches search term
      const transactionMatches = this.transactions.some(transaction =>
        transaction.customer_id === +customer.id && transaction.amount.toString().includes(searchTerm)
      );

      return nameMatches || transactionMatches;
    });
  }

  clearSearch(): void {
    this.customerSearchInput = '';
    this.filteredCustomers = this.customers;
  }

  selectCustomer(customerId: string): void {
    this.selectedCustomerTransactions = this.transactions.filter(transaction => transaction.customer_id === +customerId);
  }
}
