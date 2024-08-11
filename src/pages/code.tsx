/**
 *
 * @author Xuan
 * @since 2024/4/9 上午 12:14
 */

import { useParams } from 'react-router-dom';

const CodePage = () => {
  const { repo } = useParams();
  return (
    <>
      <div>{repo} Code Index</div>
    </>
  );
};
export default CodePage;