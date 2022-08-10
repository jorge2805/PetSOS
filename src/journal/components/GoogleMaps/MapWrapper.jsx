import Wrapper, { Status } from "./Wrapper";
import MyMapComponent from "./MyMapComponent";

const render = (status) => {
  if (status === Status.LOADING) return <p>Loading...</p>;
  if (status === Status.FAILURE) return <p>Error...</p>;
  return null;
};

const MapWrapper = ({center = { lat: 18.5142517, lng: -69.8728359}, zoom = 12}) => (
  <Wrapper apiKey="AIzaSyDCgYZTkQS0M_dba5wkuL_SYEm5exp2J5A" render={render}>
    <MyMapComponent center={center} zoom={zoom}/>
  </Wrapper>
);

export default MapWrapper;
