import BorrowTable from "@components/tables/BorrowTable";

const BorrowPage = ({ isAdmin }) => {
  return (
    <div className="workspace-page container-fluid py-4 px-3 px-lg-4">
      <header className="workspace-header d-flex flex-wrap justify-content-between align-items-start gap-3 mb-4">
        <div>
          <span>{isAdmin ? "Circulation desk" : "My reading activity"}</span>
          <h1>{isAdmin ? "Borrow history" : "My borrowed books"}</h1>
          <p>
            {isAdmin
              ? "Track active loans, returned titles, and circulation dates."
              : "Check due dates, return books, and review completed reads."}
          </p>
        </div>
      </header>
      <div className="workspace-panel all-borrow-table bg-white border rounded-3 shadow-sm p-3 p-lg-4">
        <BorrowTable isAdmin={isAdmin} />
      </div>
    </div>
  );
};

export default BorrowPage;
