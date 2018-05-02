import { Service } from 'justinject';
import { I<%= serviceCC %>Model } from '../model/<%= serviceName %>.model';
import { HemeraService } from '../hemera/hemera.service';

@Service()
export class UpdateValidatorService {

    constructor(public hemera: HemeraService) { }

    get schema() {

        return this.hemera.joi.object().required()
            .keys<I<%= serviceCC %>Model>(
            {
                name: this.hemera.joi.string().required(),
                id: this.hemera.joi.string().required(),
            });
    }
}
