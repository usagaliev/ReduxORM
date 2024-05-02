import React, {FC} from "react";
import {useOutlet} from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar";

export const Base: FC = () => {
	const outlet = useOutlet();

	return (
		<section className='app-section'>
			<div className='content-container'>
				<div className='content'>
					<Header/>
					{outlet}
				</div>
				<Sidebar/>
			</div>
			<Footer/>
		</section>
	);
}