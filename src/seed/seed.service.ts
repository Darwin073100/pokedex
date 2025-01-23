import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { AxiosAdapter } from 'src/common/adapter/axios.adapter';

@Injectable()
export class SeedService {

  constructor(
    @InjectModel(Pokemon.name) 
    private readonly pokemonModel: Model<Pokemon>,
    
    private readonly http: AxiosAdapter
  ){}

  async executeSeed() {
    await this.pokemonModel.deleteMany({});
    const data = await this.http.get<PokeResponse>(`https://pokeapi.co/api/v2/pokemon?limit=300`);
    // let insertions = [];
    let insertions = [];
    data.results.forEach(async ({name, url})=>{
      // Extraer el numero del url
      const segments = url.split('/');
      const no:number = +segments[segments.length - 2];
      
      insertions.push({name, no});
      
    });
    
    // await Promise.all( insertions );
    await this.pokemonModel.insertMany( insertions );
    
    return 'Seed executed sussefull';
  }
}
