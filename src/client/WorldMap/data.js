import { connect } from 'react-redux'
export const countries = () => {
    this.props.areas.map(item => (
        { Name: item.country = { Cases: item.cases } }
    ))
    console.log(this.props.areas)
};
function mapStateToProps(state) {
    return {
        areas: state.areas
    }
}
export default connect(mapStateToProps)(countries)