import { createCache, createResource } from 'react-cache'
import P from 'bluebird'
import sync, { cancelSync } from 'framesync'
import { getBox, withScroll } from 'css-box-model'

// TODO: generator version
async function getPosition(id) {
	const el = document.querySelector(`[flip-id="${id}"]`)
	//wrap with framesync
	const position = getBox(el)
}

const PositionResource = createResource(getPosition, ({ id }) => id)

function AsyncRect({ id }) {
	const pos = PositionResource.read(cache, id)
	return (
		<div style={{ transform: `translate3d(${pos.x}px, ${pos.y}px, 0)` }}>
			LOL
		</div>
	)
}

class App extends React.Component {
	render() {
		return (
			<div>
				<div flip-id="a">
					<h1 />
				</div>
				<div flip-id="a" />
			</div>
		)
	}
}
