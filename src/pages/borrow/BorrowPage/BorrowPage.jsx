import BorrowTable from "@components/tables/BorrowTable";

const BorrowPage = ({ isAdmin }) => {
  return (
    <div className="p-3">
      <h3>{isAdmin ? "All Borrows" : "My borrowList"}</h3>
      <hr />
      <div className="all-borrow-table">
        <BorrowTable isAdmin={isAdmin} />
      </div>
    </div>
  );
};

export default BorrowPage;
