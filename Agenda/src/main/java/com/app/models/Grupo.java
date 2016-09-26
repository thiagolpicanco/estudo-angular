package com.app.models;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Grupo {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer idGrupo;

	@Column(columnDefinition = "VARCHAR(150)", nullable = false, unique = true)
	private String noGrupo;

	@Column(nullable = false)
	private Date dtCriGrupo;

	@Column
	private Date dtAltGrupo;

	@JsonIgnore
	@ManyToMany(mappedBy = "listaGrupos")
	private List<Nota> listaNotas;

	public Integer getIdGrupo() {
		return idGrupo;
	}

	public void setIdGrupo(Integer idGrupo) {
		this.idGrupo = idGrupo;
	}

	public String getNoGrupo() {
		return noGrupo;
	}

	public void setNoGrupo(String noGrupo) {
		this.noGrupo = noGrupo;
	}

	public Date getDtCriGrupo() {
		return dtCriGrupo;
	}

	public void setDtCriGrupo(Date dtCriGrupo) {
		this.dtCriGrupo = dtCriGrupo;
	}

	public Date getDtAltGrupo() {
		return dtAltGrupo;
	}

	public void setDtAltGrupo(Date dtAltGrupo) {
		this.dtAltGrupo = dtAltGrupo;
	}

	public List<Nota> getListaNotas() {
		return listaNotas;
	}

	public void setListaNotas(List<Nota> listaNotas) {
		this.listaNotas = listaNotas;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((dtCriGrupo == null) ? 0 : dtCriGrupo.hashCode());
		result = prime * result + ((idGrupo == null) ? 0 : idGrupo.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (!(obj instanceof Grupo))
			return false;
		Grupo other = (Grupo) obj;
		if (dtCriGrupo == null) {
			if (other.dtCriGrupo != null)
				return false;
		} else if (!dtCriGrupo.equals(other.dtCriGrupo))
			return false;
		if (idGrupo == null) {
			if (other.idGrupo != null)
				return false;
		} else if (!idGrupo.equals(other.idGrupo))
			return false;
		return true;
	}
}
