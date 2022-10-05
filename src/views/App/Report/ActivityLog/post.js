import Sidebar from "@components/sidebar";
import { useEffect, useState } from "react";
import PreviewValue from "../../../../components/PreviewValue";

const POST = ({ onToggle, row, toggleFunc }) => {
  const [modal, setModal] = useState(false);
  useEffect(() => {
    if (row != undefined) {
      // update
      setModal(true);
    }
  }, [row]);

  const toggle = () => {
    setModal(!modal);
    onToggle();
  };
  useEffect(() => {
    toggleFunc.current = toggle;
  }, []);
  return (
    <>
      <Sidebar
        size="lg"
        open={modal}
        title={"info"}
        headerClassName="mb-1"
        toggleSidebar={toggle}
      >
        {!!row
          ? Object.keys(row).map((x) => {
            
              return (
                <div>
                  <PreviewValue label={x} value={row[x]} column />
                  <br />
                  <hr />
                </div>
              );
            })
          : null}
      </Sidebar>
    </>
  );
};

export default POST;
