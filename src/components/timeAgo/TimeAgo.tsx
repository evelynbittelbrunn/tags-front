import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface ITimeAgo {
    createdAt: any;
}

const TimeAgo = ({ createdAt }: ITimeAgo) => {

    const formattedDistance = formatDistanceToNow(new Date(createdAt), {
        addSuffix: true,
        locale: ptBR,
    });

    const capitalizeFirstLetter = (string: string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const formattedText = capitalizeFirstLetter(formattedDistance);

    return (
        <span>{formattedText}</span>
    )
}

export default TimeAgo