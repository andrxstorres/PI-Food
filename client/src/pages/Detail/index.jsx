// import React from "react";
// import { connect } from "react-redux";

import DetailCard from "../../components/DetailCard";
import { getDetailById } from "../../redux/actions";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Detail() {
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(getDetailById(params.id));
  }, [dispatch, params.id]);

  const details = useSelector((state) => state.details);

  return (
    <div>
      <h1>{details.title}'s details.</h1>
      <Link to="/home">Home</Link>
      <DetailCard details={details} />
    </div>
  );
}

// class Detail extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       id: this.props.match.params,
//     };
//   }
//   componentDidMount() {
//     // const { id } = this.props.match.params;
//     console.log(this.props);
//     this.props.getDetailById(this.state.id);
//   }

//   render() {
//     console.log(this.props);
//     return (
//       <>
//         <h1>Detail</h1>
//         <Link to={"/home"}>Home</Link>
//         <DetailCard />
//       </>
//     );
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     getDetailById: (id) => dispatch(getDetailById(id)),
//   };
// };

// export default connect(null, mapDispatchToProps)(Detail);
