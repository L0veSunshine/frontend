import { useParams } from 'react-router-dom';

function Profile() {
  const { id } = useParams();
  return (
    <>user {id} profile page</>
  );
}

export default Profile;