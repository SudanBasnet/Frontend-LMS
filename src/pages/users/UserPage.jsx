const UserPage = () => {
  return (
    <div className="workspace-page container-fluid py-4 px-3 px-lg-4">
      <header className="workspace-header d-flex flex-wrap justify-content-between align-items-start gap-3 mb-4">
        <div>
          <span>Membership</span>
          <h1>Library members</h1>
          <p>Member records will appear here when the user-list API is connected.</p>
        </div>
      </header>
      <div className="workspace-panel library-empty-state d-flex flex-column justify-content-center bg-white border rounded-3 shadow-sm text-center p-5">
        <span aria-hidden="true">◎</span>
        <h2>No member directory available</h2>
        <p>This screen is ready for live member data; no sample accounts are being shown.</p>
      </div>
    </div>
  );
};

export default UserPage;
