import { useSelector } from "react-redux";
import { LuMail, LuShieldCheck, LuUserRound } from "react-icons/lu";
import { Col, Row } from "react-bootstrap";

const Profile = () => {
  const { user } = useSelector((state) => state.userInfo);
  const fullName = [user.fName, user.lName].filter(Boolean).join(" ");

  return (
    <div className="workspace-page container-fluid py-4 px-3 px-lg-4">
      <header className="workspace-header d-flex flex-wrap justify-content-between align-items-start gap-3 mb-4">
        <div>
          <span>Account information</span>
          <h1>My profile</h1>
          <p>Your membership and access details in one place.</p>
        </div>
      </header>
      <section className="profile-card bg-white border rounded-3 shadow-sm overflow-hidden">
        <div className="profile-card__identity d-flex align-items-center gap-3 p-4 p-lg-5 bg-success text-white">
          {user.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt=""
              className="profile-card__avatar object-fit-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            <span className="profile-card__avatar">
              {user.fName?.charAt(0) || "M"}
            </span>
          )}
          <div>
            <span>{user.role === "admin" ? "Library administrator" : "Library member"}</span>
            <h2>{fullName || "Library member"}</h2>
            <p>Member ID: {user._id || "Not available"}</p>
          </div>
        </div>
        <Row className="profile-card__details g-0 p-3">
          {[
            [LuUserRound, "Full name", fullName || "Not provided"],
            [LuMail, "Email address", user.email || "Not provided"],
            [
              LuShieldCheck,
              "Sign-in methods",
              user.authProviders?.join(" + ") || "Password",
            ],
          ].map(([Icon, label, value]) => (
            <Col md key={label} className="d-flex align-items-start gap-3 p-3">
              <Icon className="text-warning fs-5" />
              <div className="d-flex flex-column"><span className="small text-secondary">{label}</span><strong>{value}</strong></div>
            </Col>
          ))}
        </Row>
      </section>
    </div>
  );
};

export default Profile;
