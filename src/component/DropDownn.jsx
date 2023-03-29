import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";

const DropDownn = (props) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => {
    return state.users;
  });
  const onClick = ({ key }) => {
    key = Number(key);
    if (key !== props.bucketIndex) {
      props.moveCards(props.bucketIndex, key);
    } else {
    }
  };
  let items = [];
  data.map((dt, idx) => {
    items = [...items, { label: dt["bucketName"], key: `${idx}` }];
  });

  return (
    <>
      <Dropdown
        menu={{
          items,
          onClick,
        }}
      >
        <a>
          <Space>
            Move to another Bucket
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    </>
  );
};
export default DropDownn;
