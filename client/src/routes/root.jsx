import { Link } from 'react-router-dom';

export default function Root() {
  return (
    <>
      <h1>Root Page</h1>
      <Link to={`tasks`}>Tasks</Link>
    </>
  );
}
