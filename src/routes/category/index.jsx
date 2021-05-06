import React from "react";
import PropTypes from "prop-types";
import { CardDeck } from "reactstrap";
import { Row, Col, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import DappPreview from "../../components/dappPreview";
import resolversJson from "../../legacy/resolvers.json";

function Category({ match }) {
  const { name } = match.params;
  const dappsToDisplay = [];

  Object.keys(resolversJson).forEach((key) => {
    if (resolversJson[key].category === name) {
      dappsToDisplay.push(key);
    }
  });

  function displayDapps() {
    const dappsPreviews = [];

    for (let i = 0; i < dappsToDisplay.length; i += 1) {
      dappsPreviews.push(
        <DappPreview
          key={dappsToDisplay[i]}
          id={dappsToDisplay[i]}
          legacy
          added={false}
        />
      );
    }

    return dappsPreviews;
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-12">
          <div className="title">{`${name} dApps`}</div>
        </div>
      </div>


      {dappsToDisplay.length > 0 ? (
        <div className="row">
          {displayDapps()}
        </div>
      ) : (
        <div className="row">
          {/* <Col>
            <Row className="additional-help align-items-center">
              <Col>
                <h4 className="additional-help__title">Be The First</h4>
                <p className="additional-help__subtitle">
                  Submit your dApp to this category and earn a Hydro bounty!
                </p>
              </Col>
              <Col sm="4" className="text-right">
                <a
                  href="/submit"
                  rel="noopener noreferrer"
                  className="btn btn-outlined btn-md"
                >
                  Submit dApp
                </a>
              </Col>
            </Row>
          </Col> */}
          <div className="col-lg-12">
            <div className="additional_help_main">
              <div className="row">
                <div className="col-lg-10">
                  <h2>Be The First</h2>
                  <p>Submit your dApp to this category and earn a Hydro bounty!</p>
                </div>

                <div className="col-lg-2">
                  <Button type="button" tag={NavLink} to="/submit" className="button" >Submit dApp</Button>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

Category.propTypes = {
  /* eslint-disable-next-line react/forbid-prop-types */
  match: PropTypes.object.isRequired,
};

export default Category;
