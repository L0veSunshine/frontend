/**
 *
 * @author Xuan
 * @since 2024/4/9 上午 12:14
 */

import { Outlet, useParams } from 'react-router-dom';

const RepoIndex = () => {
  const { repo } = useParams();
  return (
    <>
      <div>{repo} Index</div>
      <Outlet />
    </>
  );
};
export default RepoIndex;