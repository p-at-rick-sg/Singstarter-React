import ContributorHome from '../components/ContributorHome';

const MemberPage = () => {
  //check logged in session data and bypass login if exists

  return (
    <div>
      <p>Main Member page (logged in) placeholder</p>
      {/* TODO: add logic here to display the user or contreinutor page depending on the role  */}
      <ContributorHome />
    </div>
  );
};

export default MemberPage;
