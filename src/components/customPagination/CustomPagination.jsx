import { Pagination } from "react-bootstrap";

const CustomPagination = ({ active, setActive, pages }) => {
  let items = [];
  for (let number = 1; number <= pages; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === active}
        onClick={() => setActive(number)}
      >
        {number}
      </Pagination.Item>,
    );
  }
  return (
    <div className="d-flex justify-content-center mt-3 ">
      <Pagination>{items}</Pagination>
    </div>
  );
};

export default CustomPagination;
