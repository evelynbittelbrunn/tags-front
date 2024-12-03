import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface ITimeAgo {
    createdAt: any;
}

const TimeAgo = ({ createdAt }: ITimeAgo) => {

    const formattedDistance = formatDistanceToNow(new Date(`${createdAt}Z`), {
        addSuffix: true,
        locale: ptBR,
    });

    function capitalizeFirstLetter(text?: string): string {
        if (!text) {
            return '';
        }
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

    const formattedText = capitalizeFirstLetter(formattedDistance);

    return (
        <span>{formattedText}</span>
    )
}

export default TimeAgo