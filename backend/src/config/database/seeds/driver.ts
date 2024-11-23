import { Driver } from '@/core/driver/entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export class AdminUser implements Seeder {
  track = false;

  public async run(dataSource: DataSource, _: SeederFactoryManager): Promise<any> {
    const userRepository = dataSource.getRepository(Driver);

    for (const driver of drivers) {
      const alreadyDriver = await userRepository.findOne({ where: { id: driver.id } });

      if (!alreadyDriver) {
        const newDriver = new Driver(
          driver.id,
          driver.name,
          driver.description,
          driver.vehicle,
          driver.reviewRating,
          driver.reviewComment,
          driver.pricePerKm,
          driver.minimumRequiredKm,
        );

        await userRepository.save(newDriver);
      }
    }
  }
}

const drivers = [
  {
    id: 1,
    name: 'Homer Simpson',
    description:
      'Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).',
    vehicle: 'Plymouth Valiant 1973 rosa e enferrujado',
    reviewRating: 2,
    reviewComment: 'Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.',
    pricePerKm: 2.5,
    minimumRequiredKm: 1,
  },
  {
    id: 2,
    name: 'Dominic Toretto',
    description:
      'Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.',
    vehicle: 'Dodge Charger R/T 1970 modificado',
    reviewRating: 4,
    reviewComment:
      'Que viagem incrível! O carro é um show à parte e o motorista, apesar de ter uma cara de poucos amigos, foi super gente boa. Recomendo!',
    pricePerKm: 5,
    minimumRequiredKm: 5,
  },
  {
    id: 3,
    name: 'James Bond',
    description:
      'Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.',
    vehicle: 'Aston Martin DB5 clássico',
    reviewRating: 5,
    reviewComment:
      'Serviço impecável! O motorista é a própria definição de classe e o carro é simplesmente magnífico. Uma experiência digna de um agente secreto.',
    pricePerKm: 10,
    minimumRequiredKm: 10,
  },
];
