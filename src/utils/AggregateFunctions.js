const FilterAggregation = (Array, FilterFunc) => {
	const filtered = Array.filter(FilterFunc);
	return filtered;
};

const MappedAggregation = (Array, MapFunc) => {
	const mapped = Array.map(MapFunc);
	return mapped;
};

const ReducedAggregation = (Array, ReduceFunc, CurrentValue) => {
	const reduced = Array.reduce(ReduceFunc, CurrentValue);
	return reduced;
};

module.exports = {
	FilterAggregation,
	MappedAggregation,
	ReducedAggregation,
};
