import React from "react";
import { Formik, Form, Field } from "formik";
import "./mailform.scss";

function MailForm() {
	return (
		<div className="mailform frame">
			<Formik
				initialValues={{
					firstname: "",
					lastname: "",
					email: "",
					message: "",
				}}
			>
				{(props) => (
					<Form>
						<Field name="firstname" placeholder="Ad" />
						<Field name="lastname" placeholder="Soyad" />

						<Field type="email" name="email" placeholder="Email" />
						<Field as="textarea" name="message" placeholder="Mesaj" />
						<button type="submit">Gönder</button>
					</Form>
				)}
			</Formik>
		</div>
	);
}

export default MailForm;
