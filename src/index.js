import React from 'react'
import { render } from 'react-dom'
import Hello from './Hello'
import { Router, Link, navigate } from '@reach/router'

const Invoices = props => (
	<div>
		<form
			onSubmit={async event => {
				event.preventDefault()
				const id = event.target.elements[0].value
				event.target.reset()

				// pretend like we saved a record to the DB here
				// and then we navigate imperatively
				await navigate(`/invoices/${id}`, { state: { lol: 'hahaha' } })
				setTimeout(() => {
					console.log('ok cool')
				}, 2000)
			}}>
			<p>
				<label>
					New Invoice ID: <input type="text" />
				</label>
				<button type="submit">create</button>
			</p>
		</form>

		{props.children}
	</div>
)

const App = () => (
	<div>
		<Invoices />
	</div>
)

render(<App />, document.getElementById('root'))
