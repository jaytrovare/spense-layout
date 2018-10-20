import React from 'react'
import { navigate, Match, Location } from '@reach/router'
import sync from 'framesync'
import Component from "@reach/component-component"

let ImageResource = createResource(src => {
	return new Promise(resolve => {
		let img = new Image()
		img.src = src
		img.onload = () => {
			setTimeout(() => {
				resolve(src)
			}, 3000)
		}
	})
})

function Img({ src, ...props }) {
	return <img src={ImageResource.read(cache, src)} {...props} />
}

const Fetch = ({ url, props }) => (
  <Component
    url={url}
    initialState={{ data: null }}
    didMount={({ setState }) => {
      fetch(url)
        .then(res => res.json())
        .then(data => setState({ data }));
    }}
    didUpdate={({ prevProps, setState }) => {
      if (prevProps.url !== url) {
        fetch(url)
          .then(res => res.json())
          .then(data => setState({ data }));
      }
    }}
    {...props}
  />
)

class Invoices extends React.Component {
	state = {
    value: null,
		creatingNewInvoice: false
	}

	handleSubmit = async event => {
		this.setState({ creatingNewInvoice: true })
		const newInvoice = await createInvoice(event.target)
		await navigate(`/invoice/${newInvoice.id}`, { newId: newInvoice.id })
		this.setState({ creatingNewInvoice: false })
	}

	render() {
    const children = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        isActive: child.props.value === this.state.value,
        onSelect: () => this.setState({ value: child.props.value })
      });
    });

		return (
			<div>
				<LoadingBar animate={this.state.creatingNewInvoice} />
				<NewInvoiceForm onSubmit={this.handleSubmit} />
				<InvoiceList />
			</div>
		)
	}
}
