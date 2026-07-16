import BorrowTable from "@components/tables/BorrowTable";

const BorrowPage = () => {
  return (
    <div className="p-3">
      <h3>All Borrows</h3>
      <hr />
      <div className="all-borrow-table">
        <BorrowTable />
      </div>
    </div>
  );
};

export default BorrowPage;
