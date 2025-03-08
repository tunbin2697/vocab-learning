import NavBar from "./NavBar";
import AutoSelector from "./AutoSelector";
import ManualSelector from "./ManualSelector";

const ImageSelector = ({ word, onImageSelect }) => {
  const payload = {
    word,
    onImageSelect,
  };

  const tabs = [
    {
      label: "Auto",
      content: <AutoSelector payload={payload} />,
    },
    // {
    //   label: "Manual",
    //   content: <ManualSelector payload={payload} />,
    // },
  ];

  return <NavBar tabs={tabs} />;
};

export default ImageSelector;
