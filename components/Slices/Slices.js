import Spacer from "./Spacer/Spacer";
import BodyText from "./BodyText/BodyText";
import Image from "./Image/Image";
import Highlight from "./Highlight/Highlight";
import ListOfItems from "./ListOfItems/ListOfItems";

const Slices = ({ slices }) => {
	const outputComponents = {
		spacer: Spacer,
		body_text: BodyText,
		image: Image,
		highlight: Highlight,
		list_of_items: ListOfItems,
	};

	return (
		<div className={"grid grid--full"}>
			{slices.map((slice, index) => {
				const Slice = outputComponents[slice.slice_type];
				return (
					<Slice
						key={`slice-${index}`}
						primary={slice.primary}
						items={slice.items}
					/>
				);
			})}
		</div>
	);
};

export default Slices;
