import BigCalendar from "../BigCalendar";
import SmallCalendar from "../SmallCalendar/SmallCalendar";
import customStyle from "./Frame.module.scss";

const Frame: React.FC = (): JSX.Element => {
  return (
    <div className={customStyle.container}>
      <div className={customStyle.miniCalendar}>
        <SmallCalendar />
      </div>
      <div className={customStyle.fullCalendar}>
        <BigCalendar />
      </div>
    </div>
  );
};

export default Frame;
