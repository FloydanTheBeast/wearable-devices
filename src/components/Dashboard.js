import React, { Component } from "react";
import styled from "styled-components";
import ArrowIcon from "../assets/arrow-icon.svg";
import { aggregateData, dataTypes } from "../utils/googleApiManager";
import DataChart from "./DataChart";

const StyledDashboard = styled.div`
	width: 80%;
	max-width: 600px;
	margin: 40px auto;

	& > p {
		text-align: center;
	}
`;

const PeriodControls = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 40px;

	& > svg {
		width: 25px;
		fill: #fff;
		background-color: #262b33;
		padding: 10px;
		border-radius: 4px;
		transition: fill 0.2s;

		&.previous {
			transform: rotate(180deg);
		}

		&.disabled {
			display: none;
		}

		&:hover {
			cursor: pointer;
			fill: #555;
		}
	}
`;

class Dashboard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			startTime: null,
			endTime: null,
			weekOffset: 0,
			data: dataTypes.map((dataType) =>
				Object.assign(dataType, { values: [] })
			)
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
					newData[index].values = response.data;

					return {
						startTime: response.startTime,
						endTime: response.endTime,
						data: newData
					};
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
			<StyledDashboard>
				<p>
					{this.state.startTime?.toLocaleDateString()} -{" "}
					{this.state.endTime?.toLocaleDateString()}
				</p>
				<PeriodControls>
					<ArrowIcon
						onClick={() =>
							this.setState((prevState) => {
								return { weekOffset: prevState.weekOffset - 1 };
							})
						}
						className="previous"
					/>
					<ArrowIcon
						onClick={() => {
							// if (this.state.weekOffset < 0) {
							this.setState((prevState) => {
								return {
									weekOffset: prevState.weekOffset + 1
								};
							});
							// }
						}}
						className={`next ${
							this.state.weekOffset >= 0 ? "disabled" : ""
						}`}
					/>
				</PeriodControls>
				{this.state.data.map(({ values, name }) => {
					return <DataChart key={name} data={values} title={name} />;
				})}
			</StyledDashboard>
		);
	}
}

export default Dashboard;
