import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PokemonService {

  constructor(
    // Inyeccion de dependencia del mongo
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,

    private readonly configService: ConfigService
  ) { }

  async create(createPokemonDto: CreatePokemonDto) {
    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      this.handleException( error );
    }
  }
  
  async findAll( paginationDto: PaginationDto) {
    const defaultLimit = this.configService.get<number>('defaultLimit');
    
    const { limit = defaultLimit, offset = 0 } = paginationDto;
    
    try {
      return await this.pokemonModel.find()
        .limit( limit )
        .skip( offset )
        .sort({
          no: 1
        })
        .select('-__v');

    } catch (error) {
      console.log(error);
    }
  }
  
  async findOne(term: string) {
    let pokemon: Pokemon;

    if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ no: term });
    } if (isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term);
    } else {
      pokemon = await this.pokemonModel.findOne({ name: term });
    }
    
    if (!pokemon) {
      throw new NotFoundException(`Pokemon ${term} not found`);
    }
    
    return pokemon;
  }
  
  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    try {
      
      const pokemon = await this.findOne(term);
      
      await pokemon.updateOne(updatePokemonDto);
      
      return {
        ...pokemon.toJSON(),
        ...updatePokemonDto
      }
    } catch (error) {
      this.handleException( error );
    }
  }

  async remove(id: string) {
    // const pokemon = await this.findOne(id);
    // await pokemon.deleteOne();
    const result = await this.pokemonModel.deleteOne({_id: id});
    
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Pokemon ${id} not found`);
    }

    return result;
  }

  private handleException(error: any){
    if (error.code === 11000) {
      throw new BadRequestException(`Pokemon exists in db ${JSON.stringify(error.keyValue)}`);

    }
    console.log(error);
    throw new InternalServerErrorException();
  }
}
