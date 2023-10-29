import 'bootstrap/dist/css/bootstrap.min.css';
import { Field, Form, Formik } from 'formik';
import { MaterialReactTable } from 'material-react-table';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import { redirect, useLoaderData, useNavigate } from 'react-router-dom';
import { date, number, object, string } from 'yup';
import { updateTournament } from '../utils/utilsTournaments';

export async function action({ request, params }) {
	const formData = await request.formData();
	const updates = Object.fromEntries(formData);
	await updateTournament(params.tournamentId, updates);
	return redirect(`/tournaments/${params.tournamentId}`);
}

let tournamentSchema = object({
	TournamentName: string()
		.required('Tournament name is required')
		.min(2, 'name should not be less than 2')
		.max(25, 'name should not be more than 25'),
	TournamentCode: number().required().positive().integer(),
	TournamentStartTime: date().default(() => new Date()),
	TournamentEndTime: date().default(() => new Date()),
  SpinStartTime: date().default(() => new Date()),
	SpinEndTime: date().default(() => new Date()),
  Opertor: string().required().min().max(),
  Game: string()
});

export default function EditTournament() {
	const { tournament } = useLoaderData();
	const navigate = useNavigate();
	const [tournamentName, setTournamentName] = useState('');
	const [error, setError] = useState({});
	useState(() => {
		const error = {};
		if (!(tournamentName.length < 2)) {
			error.tournamentName = 'Tournament name should not be more than 50';
		}
		setError(error);
    const fruitsList = ["lime", "mango", "coconut", "grapefruit"];

  const [data, setData] = useState(originalData);

  const tableColumns = [
    { title: "Client", field: "id" },
    { title: "Name", field: "name" },

    {
      title: "Choose a Fruit",
      field: "fruit",
      editComponent: ({ value, onChange }) => 
        <select onChange={(e) => onChange(e.target.value)}>
          <option selected value={value}>
            {value}
          </option>
          {fruitsList.map(
            (item) =>
              item !== value && (
                <option key={item} value={item}>
                  {item}
                </option>
              )
          )}
        </select>}]
      
    
	}, [tournamentName]);
  

	return (
		<div>
			<Formik
				initialValues={{
					PromoType: [
						// {
						//   bonusSpin:"",
						//   tournament:"",
						// },
					],
					TournamentName: '',
					tournamentCode: '',
					TournamentStartDate: '',
					TournamentEndDate: '',
					SpinStartDate: '',
					SpinEndTime: '',
					AutoOptIn: '',
					Toggle: false,
					Checked: false,
					Operator: '',
					Participant: '',
					Game: '',
					PrizePool: [
						// {
						// rankingType:"",
						// rankingPosition:"",
						// isMonetary:"",
						// prizeAmount:"",
						// },
					],
				}}
				validationSchema={tournamentSchema}
				onSubmit={async (values) => {
					console.log(values);
				}}
			>
				<Form method="post" id="tournament-form">
					<h4>Tournament Set Up Form</h4>

					<Field
						component="select"
						name="PromoType"
						id="Promo Type"
						multiple={true}
					>
						<option value="Bonus Spin">Bonus Spin</option>
						<option value="Tournament">Tournament</option>
					</Field>

					<label htmlFor="TournamentName">Tournament Name</label>
					<Field
						id="TournamentName"
						name="TournamentName"
						placeholder="Tournament Name"
					/>

					<label htmlFor="TournamentCode">Tournament Code</label>
					<Field
						id="TournamentCode"
						name="TournamentCode"
						placeholder="Tournament Code"
					/>

					<label htmlFor="TournamentStartDate">Tournament Start Date</label>
					<Field
						placeholder="Start Date/Time"
						aria-label="End Date/Time"
						type="datetime-local"
						name="TournamentStartDate"
						id="TournamentStartDate"
					/>

					<label htmlFor="TournamentEndDate">Tournament End Date</label>
					<input
						placeholder="End Date/Time"
						aria-label="End Date/Time"
						type="datetime-local"
						name="TournamentEndDate"
						id="TournamentEndDate"
					/>

					<label htmlFor="SpinStartDate">Spin Start Date</label>
					<Field
						placeholder="Start Date/Time"
						aria-label="End Date/Time"
						type="datetime-local"
						name="SpinStartDate"
						id="SpinStartDate"
					/>

					<label htmlFor="SpinEndDate">Spin End Date</label>
					<input
						placeholder="End Date/Time"
						aria-label="End Date/Time"
						type="datetime-local"
						name="SpinEndDate"
						id="SpinEndDate"
					/>

					<label htmlFor="Participants">Participants</label>
					<Field
						id="participants"
						name="participants"
						arial-label="Participants"
						placeholder="Participants"
						type="text"
					/>

					<label htmlFor="AutoOptIn">Auto Opt In</label>
					<label>
						Yes <Field type="radio" name="picked" value="Yes" />
					</label>
					<label>
						{' '}
						No
						<Field type="radio" name="picked" value="No" />
					</label>

					{/* <label>
             <Field type="checkbox" name="isAwesom" />
             Are you awesome?
           </label> */}
					{/* <div className="label">
						What best describes you? (check all that apply)
					</div>

					<label>
						<Field type="checkbox" name="PrizePool" value="Ranking Type" />
						Ranking Type
					</label>
					<label>
						<Field type="checkbox" name="PrizePool" value="Ranking Position" />
						Ranking Position
					</label>
					<label>
						<Field type="checkbox" name="PrizePool" value="Is Monetary" />
						Is Monetary
					</label>
					<label>
						<Field type="checkbox" name="PrizePool" value="Prize Pool Total" />
						Prize Pool Total
					</label> */}

					{/* <div id="checkbox-group">Prize Pool</div>
					<div role="group" aria-labelledby="checkbox-group">
						<label>
							<Field type="checkbox" name="checked" value="Ranking Type" />
							Ranking Type
						</label>
						<label>
							<Field type="checkbox" name="checked" value="Ranking Position" />
							Ranking Position
						</label>
						<label>
							<Field type="checkbox" name="checked" value="Is Monetary" />
							Is Monetary
						</label> */}
					{/* </div> */}

					<button type="submit">Submit</button>
				</Form>
			</Formik>
		</div>
	);
}
