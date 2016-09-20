package com.app.models;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

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

	public Date getDtCriacaoGrupo() {
		return dtCriGrupo;
	}

	public void setDtCriacaoGrupo(Date dtCriacaoGrupo) {
		this.dtCriGrupo = dtCriacaoGrupo;
	}

	public Date getDtaAlteracaoGrupo() {
		return dtAltGrupo;
	}

	public void setDtaAlteracaoGrupo(Date dtaAlteracaoGrupo) {
		this.dtAltGrupo = dtaAlteracaoGrupo;
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
		result = prime * result + ((dtAltGrupo == null) ? 0 : dtAltGrupo.hashCode());
		result = prime * result + ((idGrupo == null) ? 0 : idGrupo.hashCode());
		result = prime * result + ((listaNotas == null) ? 0 : listaNotas.hashCode());
		result = prime * result + ((noGrupo == null) ? 0 : noGrupo.hashCode());
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
		if (dtAltGrupo == null) {
			if (other.dtAltGrupo != null)
				return false;
		} else if (!dtAltGrupo.equals(other.dtAltGrupo))
			return false;
		if (idGrupo == null) {
			if (other.idGrupo != null)
				return false;
		} else if (!idGrupo.equals(other.idGrupo))
			return false;
		if (listaNotas == null) {
			if (other.listaNotas != null)
				return false;
		} else if (!listaNotas.equals(other.listaNotas))
			return false;
		if (noGrupo == null) {
			if (other.noGrupo != null)
				return false;
		} else if (!noGrupo.equals(other.noGrupo))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Grupo [idGrupo=" + idGrupo + ", noGrupo=" + noGrupo + ", dtCriacaoGrupo=" + dtCriGrupo
				+ ", dtaAlteracaoGrupo=" + dtAltGrupo + ", listaNotas=" + listaNotas + "]";
	}
}
