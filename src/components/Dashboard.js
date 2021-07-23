import React, { Component } from "react";
import styled from "styled-components";
import { aggregateData, dataTypes } from "../utils/googleApiManager";
import DataChart from "./DataChart";

const PeriodControls = styled.div``;

class Dashboard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: dataTypes.map((dataType) =>
				Object.assign(dataType, { values: [] })
			),
			weekOffset: 0
		};

		this.updateData = this.updateData.bind(this);
		this.updateData();
	}

	updateData() {
		dataTypes.forEach((dataType, index) => {
			aggregateData(
				this.props.accessToken,
				dataType,
				this.state.weekOffset
			).then((response) => {
				this.setState((prevState) => {
					let newData = prevState.data;
					newData[index].values = response;

					return { data: newData };
				});
			});
		});
	}

	componentDidUpdate(_, prevState) {
		if (prevState.weekOffset != this.state.weekOffset) {
			this.updateData();
		}
	}

	render() {
		return (
			<>
				<PeriodControls>
					<div
						onClick={() =>
							this.setState((prevState) => {
								return { weekOffset: prevState.weekOffset - 1 };
							})
						}
						className="previous"
					>
						{"<"}
					</div>
					<div
						onClick={() =>
							this.setState((prevState) => {
								return { weekOffset: prevState.weekOffset + 1 };
							})
						}
						className="next"
					>
						{">"}
					</div>
				</PeriodControls>
				{this.state.data.map(({ values, name }) => {
					return <DataChart key={name} data={values} title={name} />;
				})}
			</>
		);
	}
}

export default Dashboard;
